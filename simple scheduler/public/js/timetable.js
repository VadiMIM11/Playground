
$(function () {

    let format = $("#format").val();
    let interv = $("#interval").val();
    let start = $("#start-time").val();
    let end = $("#end-time").val();

    let intervNum = parseInt(interv);
    let startNum = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
    let endNum = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);



    let timetable = new Timetable('#timetable-container', {
        interval: intervNum,
        startMinute: startNum,
        endMinute: endNum,
    });
    timetable.render();

    // let timetable2 = new Timetable('#timetable-container', {
    //     interval: 240
    // });
    // timetable2.render();


    $("#update-timetable").on('click', function () {

        format = $("#format").val();
        interv = $("#interval").val();
        start = $("#start-time").val();
        end = $("#end-time").val();

        intervNum = parseInt(interv);
        startNum = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
        endNum = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);

        console.log(start, end, interv, format);
        console.log(intervNum, startNum, endNum);

        timetable.updateOptions({
            interval: intervNum,
            startMinute: startNum,
            endMinute: endNum,
        });
    });
});

class Timetable {
    static #counter = 0;
    static mouseEventsRegistered = false;
    static isLeftMouseDown = false;
    static isSelecting = true; // Is user currently selecting or deselecting cells
    static defaultOptions = {
        interval: 60,
        startMinute: 0,
        endMinute: 1440,
    }

    constructor(selector, options = {}) {

        this.options = { ...Timetable.defaultOptions, ...options };
        this.containerSelector = selector;
        this.container = $(this.containerSelector);
        this.timetable = undefined;
        this.id = Timetable.#counter++;
        this.#init();
    }

    #init() {
        Timetable.#registerMouseEvents();
        this.#populate();
    }

    #populate() {
        this.timetable = $('<table class="timetable table table-sm table-striped table-bordered"></table>');
        this.timetable.attr('id', `timetable-${this.id}`);
        var tableHeader = this.#getTableHeader();
        const numColumns = tableHeader.children().find('th').length;
        const tbody = this.#getTableBody(numColumns);

        this.timetable.append(tableHeader);
        this.timetable.append(tbody);
    }

    #getTableHeader() {
        const thead = $('<thead></thead>');
        const tr = $('<tr></tr>');
        tr.append('<th class="text-center">Time Slot</th>');
        tr.append('<th class="text-center">Monday</th>');
        tr.append('<th class="text-center">Tuesday</th>');
        tr.append('<th class="text-center">Wednesday</th>');
        tr.append('<th class="text-center">Thursday</th>');
        tr.append('<th class="text-center">Friday</th>');
        tr.append('<th class="text-center">Saturday</th>');
        tr.append('<th class="text-center">Sunday</th>');
        thead.append(tr);
        return thead;
    }

    #getTableBody(numColumns) {
        const tbody = $('<tbody></tbody>');
        tbody.addClass('table-group-divider');
        var minute = this.options.startMinute;
        for (let i = 0; i < (24 * 60 - this.options.startMinute - (24 * 60 - this.options.endMinute)) / this.options.interval; i++) {
            const tr = $('<tr></tr>');
            const current = this.formatMinutesToTime(minute);
            if (minute + this.options.interval > this.options.endMinute) {
                break; // Stop if the next interval exceeds the end minute
            }
            const next = this.formatMinutesToTime(minute + this.options.interval);
            const time = `${current} - ${next}`;
            tr.append('<th class="text-center">' + time + '</th>');
            for (let j = 0; j < numColumns - 1; j++) {
                const td = $('<td></td>');
                td.on('mousedown mouseenter', (e) => this.#selectCell(e, td));
                tr.append(td);
            }
            tbody.append(tr);
            minute += this.options.interval;
        }
        return tbody;
    }

    #selectCell(e, element) {
        if (e.type === 'mousedown' && e.button === 0) {
            if (element.hasClass('bg-success')) {
                Timetable.isSelecting = false; // User is deselecting
            }
            else {
                Timetable.isSelecting = true; // User is selecting
            }

            element.toggleClass('bg bg-success');
            return;
        }
        if (e.type === 'mouseenter' && Timetable.isLeftMouseDown) {
            if (element.hasClass('bg-success') && !Timetable.isSelecting) {
                element.removeClass('bg bg-success');
            }
            else if (!element.hasClass('bg-success') && Timetable.isSelecting) {
                element.addClass('bg bg-success');
            }
        }
    }

    static #registerMouseEvents() {
        if (Timetable.mouseEventsRegistered) return;

        $(document).on('mousedown', function (event) {
            if (event.button === 0) { // 0 = left button
                Timetable.isLeftMouseDown = true;
            }
        });

        $(document).on('mouseup', function (event) {
            if (event.button === 0) { // 0 = left button
                Timetable.isLeftMouseDown = false;
            }
        });

        Timetable.mouseEventsRegistered = true;
    }

    formatMinutesToTime(minutes) {
        const hours = Math.floor(minutes / 60);
        if (hours >= 24) {
            return "00:00"; // Reset to midnight if hours exceed 24
        }
        const mins = minutes % 60;
        const paddedHours = String(hours).padStart(2, '0');
        const paddedMins = String(mins).padStart(2, '0');
        return `${paddedHours}:${paddedMins}`;
    }

    updateOptions(newOptions) {
        this.options = { ...this.options, ...newOptions };
        //this.container.empty();
        //this.container.children(`#timetable-${this.id}`).remove(); // Clear the existing timetable
        this.#populate(); // Re-populate with new options
        this.container.children(`#timetable-${this.id}`).replaceWith(this.timetable); // Replace the old timetable with the new one
        //this.render(); // Render the updated timetable
    }

    render() {
        this.container.append(this.timetable);
    }
}





