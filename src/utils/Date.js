export class Custom_Date {
    today = new Date();

    // Get today's date
    getToday() {
        return this.today;
    }

    // Get today's date in string format
    getTodayString() {
        return this.today.toISOString().split("T")[0];
    }

    // Convert date to string
    toStringDate(date) {
        return date.toISOString().split("T")[0];
    }

    // Get date two days after today
    getTwoDaysAfterToday() {
        const twoDaysAfterToday = new Date(this.today);
        twoDaysAfterToday.setDate(this.today.getDate() + 2);
        return twoDaysAfterToday;
    }

    twoDaysAfterTodayToString() {
        return this.toStringDate(this.getTwoDaysAfterToday());
    }



}