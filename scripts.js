document.getElementById('add-workout').addEventListener('click', function() {
    const date = document.getElementById('workout-date').value;
    const name = document.getElementById('workout-name').value;
    const weight = document.getElementById('weight').value;
    const sets = document.getElementById('sets').value;

    if (date && name && weight && sets) {
        fetch('http://localhost:5000/api/workouts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date, name, weight, sets })
            })
            .then(response => response.json())
            .then(data => {
                addWorkoutToTable(data);
            })
            .catch(error => console.error('Error:', error));
    } else {
        alert('Please fill out all fields.');
    }
});

document.getElementById('filter-button').addEventListener('click', function() {
    const filterDate = document.getElementById('filter-date').value;

    if (filterDate) {
        fetch(`http://localhost:5000/api/workouts?date=${filterDate}`)
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('workout-log').getElementsByTagName('tbody')[0];
                tableBody.innerHTML = ''; // 기존 내용을 지우고
                data.forEach(workout => addWorkoutToTable(workout));
            })
            .catch(error => console.error('Error:', error));
    }
});

function addWorkoutToTable(workout) {
    const table = document.getElementById('workout-log').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const dateCell = newRow.insertCell(0);
    const nameCell = newRow.insertCell(1);
    const weightCell = newRow.insertCell(2);
    const setsCell = newRow.insertCell(3);

    dateCell.textContent = workout.date;
    nameCell.textContent = workout.name;
    weightCell.textContent = workout.weight;
    setsCell.textContent = workout.sets;
}

// 오늘 날짜 설정 및 해당 날짜의 운동 기록 로드
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('workout-date').value = today;
    document.getElementById('filter-date').value = today;

    fetch(`http://localhost:5000/api/workouts?date=${today}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('workout-log').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = ''; // 기존 내용을 지우고
            data.forEach(workout => addWorkoutToTable(workout));
        })
        .catch(error => console.error('Error:', error));
});