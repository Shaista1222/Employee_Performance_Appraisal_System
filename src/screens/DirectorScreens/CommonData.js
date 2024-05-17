// CommonData.js
class CommonData {
    generateNames() {
        return [
            "--Select Employee--",
            "Munir Ahmed",
            "Jamil Sarwar",
            "Nadia",
            "Naseer Ahmed Sajid",
            "Qasim Shehzad",
            "Muhammad Ihsan",
            "Shahid Abid",
            "Umar Farooq",
            "Zahid Ahmad",
            "Amir Rasheed"
        ];
    }

    generateEmployeeTypes() {
        return [
            "--Select Role--",
            "Senior Teacher",
            "Junior Teacher",
            "Engineer",
            "Salesperson",
            "Accountant",
            "Human Resources",
            "Consultant",
            "Analyst",
            "Designer",
            "Technician",
            "Administrator"
        ];
    }

    generateDesignations() {
        return [
            "--Select Role--",
            "Teacher",
            "Supervisor",
            "Engineer",
            "Associate",
            "Analyst",
            "Specialist",
            "Coordinator",
            "Consultant",
            "Administrator",
            "Director"
        ];
    }

    generateCourseNames() {
        const COURSE_NAMES = [
            "Introduction to Computer Science",
            "Data Structures and Algorithms",
            "Computer Networks",
            "Database Management Systems",
            "Operating Systems",
            "Software Engineering",
            "Artificial Intelligence",
            "Machine Learning",
            "Web Development",
            "Cybersecurity",
            "Computer Graphics",
            "Computer Organization and Architecture",
            "Computer Vision",
            "Mobile Application Development"
        ];
        const courses = [];
        for (let i = 0; i < 15; i++) {
            const index = Math.floor(Math.random() * COURSE_NAMES.length);
            courses.push(COURSE_NAMES[index]);
        }
        return courses;
    }

    getSubKPITypes() {
        return [
            "--Select SubKPi--",
            "Peer Evaluation",
            "CHR",
            "Student Evaluation"
        ];
    }

    generateDepartments() {
        return [
            "--Select Department",
            "CS",
            "Marketing",
            "Human Resources",
            "Finance",
            "Information Technology",
            "Operations",
            "Sales",
            "Customer Service",
            "Research and Development",
            "Administration"
        ];
    }

    getSessionPerformance() {
        // Implement session performance retrieval if needed
    }

    getSessionsPerformance() {
        // Implement sessions performance retrieval if needed
    }
}

export default CommonData;
