$(function () {
    populateTimetable();
});

function populateTimetable(interval = 15) {
    const timetable = $('#timetable');
    var tableHeader = getTableHeader();
    timetable.append(tableHeader);
    const numColumns = tableHeader.children().first().children().length;
    const tbody = getTableBody(numColumns, interval);
    timetable.append(tbody);
}

function getTableHeader() {
    const thead = $('<thead></thead>');
    const tr = $('<tr></tr>');
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

function getTableBody(numColumns, interval) {
    const tbody = $('<tbody></tbody>');
    tbody.addClass('table-group-divider');
    //alert("Num Columns: " + numColumns);
    
    for (let i = 0; i < 24 * 60 / interval; i++) {
        const tr = $('<tr></tr>');
        for (let j = 0; j < numColumns; j++) {
            const td = $('<td></td>');
            td.addClass('text-center');
            const time = formatMinutesToTime(i * interval);
            td.text(time);
            tr.append(td);
        }
        tbody.append(tr);
    }
    return tbody;
}

function formatMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMins = String(mins).padStart(2, '0');
    return `${paddedHours}:${paddedMins}`;
}