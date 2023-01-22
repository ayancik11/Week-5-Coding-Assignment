class Lure {
    constructor(name) {
        this.name = name;
    }

    describe() {
        return `${this.name} is a lure in the tacklebox.`
    }
}

class Tacklebox {
    constructor(name) {
        this.name = name;
        this.lures = [];
    }

    addLure(lure) {
        if (lure instanceof lure) {
            this.lures.push(lure);
        }else {
            throw new Error(`You can only add an instance of Lure. Argument is not a lure: ${lure}`);
        }
    }

    describe() {
        return `${this.name} has ${this.lures.length} lures.`;
    }
}

class Menu {
    constructor() {
        this.tackleboxes = [];
        this.selectedTacklebox = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case `1`:
                    this.createTacklebox();
                    break;
                case `2`:
                    this.viewTacklebox();
                    break;
                case `3`:
                    this.deleteTacklebox();
                    break;
                case `4`:
                    this.displayTackleboxes();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }
        alert(`Goodbye!`);
    }

    showMainMenuOptions() {
        return prompt (`
        0) exit
        1) create new tacklebox
        2) view tacklebox
        3) delete tacklebox
        4) display all tackleboxes
        `);
    }

    showTackleboxMenuOptions(tackleboxInfo) {
        return prompt(`
            0) back
            1) create lure
            2) delete lure
            ${tackleboxInfo}
        `);
    }

    displayTackleboxes() {
        let tackleboxString = '';
        for(let i = 0; i < this.tackleboxes.length; i++) {
            tackleboxString += i + `) ` + this.tackleboxes[i].name + `\n`;
        }
        alert(tackleboxString);
    }

    createTacklebox() {
        let name = prompt(`Enter the name for new tacklebox:`);
        this.tackleboxes.push(new Tacklebox(name));
    }
    
    viewTacklebox() {
        let index = prompt('Enter the index of the tacklebox you wish to view:');
        if (index > -1 && index < this.tackleboxes.length) {
            this.selectedTacklebox = this.tackleboxes[index];
            let description = `Team Name: ` + this.selectedTacklebox.name + '\n';

            for (let i = 0; i < this.selectedTacklebox.lures.length; i++) {
                description += i + `) ` + this.selectedTacklebox.lures[i].name
            }

            let selection = this.showTackleboxMenuOptions(description); 
            switch (selection) {
                case `1`:
                    this.createLure();
                    break;
                case `2`:
                    this.deleteLure();

            }
        }
    }

    deleteTacklebox() {
        let index = prompt(`Enter the index of the tacklebox you wish to delete:`);
        if (index > -1 && index < this.tackleboxes.length) {
            this.tackleboxes.splice(index);
        }
    }

    createLure() {
        let name = prompt(`Enter name for new lure:`);
        this.selectedTacklebox.lures.push(new Lure(name));
    }

    deleteLure() {
        let index = prompt(`Enter the index of the lure you wish to delete:`);
        if (index > -1 && index < this.selectedTacklebox.lures.length) {
            this.selectedTacklebox.lures.splice(index);
        }
    }
}

let menu = new Menu();
menu.start();