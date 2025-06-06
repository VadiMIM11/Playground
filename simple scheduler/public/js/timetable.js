$(function () {
    populateTimetable();
});



function populateTimetable(interval = 120) {
    const timetable = $('#timetable');
    var tableHeader = getTableHeader();
    const numColumns = tableHeader.children().find('th').length;
    // const colgroup = getColgroup(numColumns);
    const tbody = getTableBody(numColumns, interval);

    // timetable.append(colgroup);
    timetable.append(tableHeader);
    timetable.append(tbody);
}

function getTableHeader() {

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

// function getColgroup(numColumns) {
//     const colgroup = $('<colgroup></colgroup>');

//     colgroup.append(`<col style="width: auto;"></col>`); // Time column
    
//     for (let i = 0; i < numColumns - 1; i++) {
//         colgroup.append(`<col style="width: auto;"></col>`);
//     }
//     return colgroup;
// }

function getTableBody(numColumns, interval) {
    const tbody = $('<tbody></tbody>');
    tbody.addClass('table-group-divider');
    //alert("Num Columns: " + numColumns);

    for (let i = 0; i < 24 * 60 / interval; i++) {
        const tr = $('<tr></tr>');
        const current = formatMinutesToTime(i * interval);
        const next = formatMinutesToTime((i + 1) * interval);
        const time = `${current} - ${next}`;
        tr.append('<th class="text-center">' + time + '</th>');
        for (let j = 0; j < numColumns - 1; j++) {
            const td = $('<td></td>');
            tr.append(td);
        }
        tbody.append(tr);
    }
    return tbody;
}

function formatMinutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    if (hours >= 24) {
        return "00:00"; // Reset to midnight if hours exceed 24
    }
    const mins = minutes % 60;
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMins = String(mins).padStart(2, '0');
    return `${paddedHours}:${paddedMins}`;
}