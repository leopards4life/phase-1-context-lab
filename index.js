/* Your Code Here */

const createEmployeeRecord = function([firstName, familyName, title, payPerHour]) {
    let timeInEvents = [];
    let timeOutEvents = [];
    let employeeRecord = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents,
        timeOutEvents
    }
    return employeeRecord;

};

const createEmployeeRecords = function(records) {
    return records.map(record => createEmployeeRecord(record));
};

const createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });
    return this;
};

const createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ");

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });
    return this;
};

const hoursWorkedOnDate = function(soughtDate) {
    let inEvent = this.timeInEvents.find(e => e.date === soughtDate);
    let outEvent = this.timeOutEvents.find(e => e.date === soughtDate);
    return (outEvent.hour - inEvent.hour) / 100;
};

const wagesEarnedOnDate = function(dateSought) {
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
    * this.payPerHour;
    return parseFloat(rawWage.toString());
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
};

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName);
};

const calculatePayroll = function(records) {
    return records.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0);
};
