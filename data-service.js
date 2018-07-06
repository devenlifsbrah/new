var departments = require('./data/departments.json');
var employees = require('./data/employees.json');
const fs = require('fs');



var employing = [];
var departing = [];
function initialize(){
	return new Promise(function(resolve, reject){
	fs.readFile('./data/employees.json', function read(err, data) {
    if (err) {
        throw err;
		reject(err)
    } else {
    employing = JSON.parse(data);
    fs.readFile('./data/departments.json', function read(err1, data1) {
    if (err) {
        throw err1;
		reject(err1)
    } else {
    departing = JSON.parse(data1);
    resolve(employing, departing);   
    
    }
	});
    }
	});		
	})	
}
function addEmployees(body){
	let newEmployee = {};
	return new Promise(function(resolve, reject){
		if (body.isManager == 'undefined'){
			body.isManager = false;
			
		} else {
					body.isManager = true;
		}
		body.employeeNum = employing.length + 1;
			console.log(body);
			employing.push(body);
			resolve('Added!');
	})
}

function getEmployeesByStatus(stat){
		return new Promise(function(resolve, reject){
		let newEmployee = [];
		for (let i = 0; i < employing.length; i++){
			if (employing[i].status == stat){
				newEmployee.push(employing[i]);
				
			}
		}
		if(newEmployee.length == 0){
			reject('failed')
		} else {
		resolve(newEmployee);
		}
	
	})
	
}

function getEmployeesByDepartment(depart){
			return new Promise(function(resolve, reject){
		let newEmployee = [];
		for (let i = 0; i < employing.length; i++){
			if (employing[i].department == depart){
				newEmployee.push(employing[i]);
				
			}
		}
		if(newEmployee.length == 0){
			reject('failed')
		} else {
		resolve(newEmployee);
		}
	
	})
	
}
function getEmployeesByManager(manager) {
	return new Promise(function(resolve, reject){
		let newEmployee = [];
		for (let i = 0; i < employing.length; i++){
			if (employing[i].employeeManagerNum == manager){
				newEmployee.push(employing[i]);
				
			}
		}
		if(newEmployee.length == 0){
			reject('failed')
		} else {
			
		resolve(newEmployee);
		}
	
	})
	
	


}
function getEmployeeByNum(num) {
		return new Promise(function(resolve, reject){
		let newEmployee = [];
		for (let i = 0; i < employing.length; i++){
			console.log(employing[i]);
			if (employing[i].employeeNum == num){
				newEmployee.push(employing[i]);
				
			}
		}
		if(newEmployee.length == 0){
			reject('failed')
		} else {
			
		resolve(newEmployee);
		}
	})
	
	
	}

function getAllEmployees(){
	return new Promise(function(resolve, reject){
		if (employing.length == 0){
			reject('sorry array empty')	
		} else {
			resolve(employing);
		}
		
	})
	
	
	
}
function getDepartments(){
	return new Promise(function(resolve, reject){
		if (employing.length == 0){
			reject('sorry array empty')	
		} else {
			resolve(departing);
		}
		
	})
	
	
	
}
function getManagers(){
	return new Promise(function(resolve, reject){
		var manager = [];
		for (let i = 0; i < employing.length; i++){
			console.log(employing[i]);
			if (employing[i].isManager == true){
				manager.push(employing[i]);
				
			}
		}
		resolve(manager);
	
	})
	
	
	
}


module.exports = {
	init:initialize,
	emp:getAllEmployees,
	dep:getDepartments,
	manage:getManagers,
	addPeople:addEmployees,
	num:getEmployeeByNum,
	Managers:getEmployeesByManager,
	depart:getEmployeesByDepartment,
	stat:getEmployeesByStatus
}