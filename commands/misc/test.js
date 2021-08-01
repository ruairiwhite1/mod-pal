module.exports = {
    ownerOnly: true,
    callback: async (message) => {
        var day = new Date();
        console.log(day);

        var nextDay = new Date(day);
        nextDay.setDate(day.getDate() + 1);
        console.log(nextDay);   

    }
}