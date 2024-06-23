#!/usr/bin/env node
import inquirer from "inquirer";

class Student {
    name: string;
    constructor(n: string) {
        this.name = n;
    }
}

class Person {
    students: Student[] = [];
    addStudent(obj: Student) {
        this.students.push(obj);
    }
}

const programStart = async (persons: Person) => {
    let exitProgram = false;
    do {
        const ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "Choose an option:",
                choices: ["Staff", "Student", "Exit"],
            }
        ]);

        if (ans.select == "Staff") {
            console.log("You approach the staff room. Please feel free to ask any question...");
        } else if (ans.select == "Student") {
            const ans = await inquirer.prompt([
                {
                    name: "student",
                    type: "input",
                    message: "Enter the student's name you wish to engage with:",
                }
            ]);
            const student = persons.students.find(val => val.name == ans.student);
            if (!student) {
                const newStudent = new Student(ans.student);
                persons.addStudent(newStudent);
                console.log(`Hello, I am ${newStudent.name}. Nice to meet you!`);
                console.log("New student added.");
            } else {
                console.log(`Hello, I am ${student.name}. Nice to see you again!`);
            }
            console.log("Current student list:");
            console.log(persons.students.map(s => s.name));
        } else if (ans.select == "Exit") {
            console.log("Exiting the program...");
            exitProgram = true;
        }
    } while (!exitProgram);
};

// Example usage:
const persons = new Person();
programStart(persons);
