export class Poin {
    tanggalLahir;

    constructor(tanggalLahir) {
        this.tanggalLahir = new Date(tanggalLahir);
    }

    static count(money) {
        let totalPoints = 0;

        const pointsAndMoney = [
            { amount: 1_000_000, points: 200 },
            { amount: 500_000, points: 75 },
            { amount: 100_000, points: 15 },
            { amount: 10_000, points: 1 },
        ];

        for (const { amount, points } of pointsAndMoney) {
            const count = Math.floor(money / amount);
            totalPoints += count * points;
            money -= count * amount;
        }

        return totalPoints;
    }

    doublePoints() {
        const today = new Date();

        const birthdayThisYear = new Date(
            today.getFullYear(),
            this.tanggalLahir.getMonth(),
            this.tanggalLahir.getDate()
        );

        const diffInMilliseconds = Math.abs(today - birthdayThisYear);

        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

        return diffInDays <= 3;
    }
}
