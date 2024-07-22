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

// 초기 로딩 시 모든 운동 기록 불러오기
document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:5000/api/workouts')
        .then(response => response.json())
        .then(data => {
            data.forEach(workout => addWorkoutToTable(workout));
        })
        .catch(error => console.error('Error:', error));
});