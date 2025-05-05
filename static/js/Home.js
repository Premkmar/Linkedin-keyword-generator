const handelChangeProgram = (count) => {
    let program = document.querySelector('.program-name-' + count).value;
    let education = document.querySelector('.education-detail-' + count);
    let remove_btn = document.querySelector('.remove-' + count);

    remove_btn.classList.remove('d-none');

    if (program == '10th' || program == '12th') {
        education.innerHTML = `
        <div class="row">
            <div class="col-12">
                <input type="text" name="${program}-school" class="form-control">
                <label>${(program == '10th') ? '10th' : '12th'} School Name</label>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12">
                <input type="text" name="${program}-total" class="form-control">
                <label>Total Marks Eg: ${(program == '10th') ? '498/500' : '588/600'}</label>
            </div>
            <div class="col-md-6 col-12">
                <input type="number" name="${program}-percentage" class="form-control">
                <label>Percentage Eg:98</label>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12">
                <input type="date" name="${program}-passedout" class="form-control">
                <label>Year Of Passedout</label>
            </div>
        </div>
        `
    }
    else {
        education.innerHTML = `
        <div class="row">
            <div class="col-12">
                <input type="text" name="${program}-clg-name" class="form-control">
                <label>College Name</label>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12">
                <input type="text" name="${program}-course" class="form-control">
                <label>Name of the Course</label>
            </div>
            <div class="col-md-6 col-12">
                <input type="number" name="${program}-CGPA" class="form-control">
                <label>CGPA in percentage</label>
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 col-12">
                <input type="date" name="${program}-passedout" class="form-control">
                <label>Year Of Passedout</label>
            </div>
        </div>
        `
    }

    education.innerHTML += `
        <hr><br>
        <div class="row">
            <div class="col-6">
                <select class="form-control program-name-${count + 1}" onchange="handelChangeProgram(${count + 1})">
                    <option selected disabled>Select Program</option>
                    <option value="10th">10th</option>
                    <option value="12th">12th</option>
                    <option value="ug">UG</option>
                    <option value="pg">PG</option>
                    <option value="diploma">Diploma</option>
                    <option value="iti">ITI</option>
                    <option value="m.phil">M.Phil</option>
                    <option value="phd">PhD</option>
                    <option value="other">Other</option>
                </select>
                <label>Name of the program</label>
            </div>
            <div class="col-6 remove-${count + 1} d-none">
                <button class="btn btn-danger form-control" type="button" onclick="hideEducation(${count + 1})">Remove</button>
            </div>
        </div>
        <div class="education-detail-${count + 1}"></div>
    `;
}

const hideEducation = (count) => {
    document.querySelector('.remove-' + count).classList.add('d-none');
    document.querySelector('.education-detail-' + count).innerHTML = '';

    document.querySelector('.program-name-' + count).innerHTML = `
        <option selected disabled>Select Program</option>
        <option value="10th">10th</option>
        <option value="12th">12th</option>
        <option value="ug">UG</option>
        <option value="pg">PG</option>
        <option value="diploma">Diploma</option>
        <option value="iti">ITI</option>
        <option value="m.phil">M.Phil</option>
        <option value="phd">PhD</option>
        <option value="other">Other</option>
    `;
}
let count_company = 2;
const addWork = () => {
    let company = document.querySelector('.more-company');
    company.innerHTML += `
    <div class="cover-company-${count_company}">
        <hr><br>
        <div class="row">
            <div class="col-12">
                <input type="text" name="company-${count_company}" class="form-control">
                <label>Name of the Company</label>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <input type="text" name="designation-${count_company}" class="form-control">
                <label>Designation</label>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <input type="text" name="experience-${count_company}" class="form-control">
                <label>Year of Experience</label>
            </div>
            <div class="col-6">
                <button class="btn btn-danger form-control" type="button" onclick="hideWork(${count_company})">Remove</button>
            </div>
        </div>
    </div>`;
    count_company++;
};

const hideWork = (count) => {
    document.querySelector('.cover-company-' + count).classList.add('d-none');
};