
$(function () {
    // const settings = {};
    // settings.containerSelector = '#timetable';
    // settings.interval = 120; // Interval in minutes
    let timetable = new Timetable({
        containerSelector: '#timetable-container',
        interval: 120
    });
    timetable.render();

    let timetable2 = new Timetable({
        containerSelector: '#timetable-container',
        interval: 240
    });
    timetable2.render();
});

class Timetable {
    static mouseEventsRegistered = false;
    static isLeftMouseDown = false;
    static isSelecting = true; // Is user currently selecting or deselecting cells

    constructor(settings = { containerSelector: '#timetable', interval: 120 }) {
        this.containerSelector = settings.containerSelector;
        this.container = $(this.containerSelector);
        this.interval = settings.interval; // Interval in minutes
        this.timetable = undefined;
        this.init();
    }

    init() {
        Timetable.registerMouseEvents();
        this.populate();
        //this.render();
    }

    populate(interval = 120) {
        this.timetable = $('<table class="timetable table table-sm table-striped table-bordered"></table>');
        var tableHeader = this.getTableHeader();
        const numColumns = tableHeader.children().find('th').length;
        // const colgroup = getColgroup(numColumns);
        const tbody = this.getTableBody(numColumns);

        // this.timetable.append(colgroup);
        this.timetable.append(tableHeader);
        this.timetable.append(tbody);
    }

    getTableHeader() {
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

    getTableBody(numColumns) {
        const tbody = $('<tbody></tbody>');
        tbody.addClass('table-group-divider');
        //alert("Num Columns: " + numColumns);

        for (let i = 0; i < 24 * 60 / this.interval; i++) {
            const tr = $('<tr></tr>');
            const current = this.formatMinutesToTime(i * this.interval);
            const next = this.formatMinutesToTime((i + 1) * this.interval);
            const time = `${current} - ${next}`;
            tr.append('<th class="text-center">' + time + '</th>');
            for (let j = 0; j < numColumns - 1; j++) {
                const td = $('<td></td>');
                td.on('mousedown mouseenter', (e) => this.selectCell(e, td));
                tr.append(td);
            }
            tbody.append(tr);
        }
        return tbody;
    }

    selectCell(e, element) {
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

    static registerMouseEvents() {
        if (this.mouseEventsRegistered) return;

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

    render() {
        console.log("Rendering timetable");
        console.log(this.timetable);
        this.container.append(this.timetable);
    }
}


// function getColgroup(numColumns) {
//     const colgroup = $('<colgroup></colgroup>');

//     colgroup.append(`<col style="width: auto;"></col>`); // Time column

//     for (let i = 0; i < numColumns - 1; i++) {
//         colgroup.append(`<col style="width: auto;"></col>`);
//     }
//     return colgroup;
// }


