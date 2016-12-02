const countCards = () => {
    if(browser.isExisting('.card')) {
        browser.waitForVisible('.card', 5000);
        const elements = browser.elements('.card');
        return elements.value.length;
    } else {
        return 0;
    }
};

describe('kanban board', () => {
    before(() => {
        browser.url('http://localhost:3000');
        browser.waitForExist(".container", 5000);
        //This should clear all existing cards
        browser.elements('.delete').value.forEach(function(element) {
            browser.elementIdClick(element.ELEMENT);
        })
    });

    it('can create a todo card with simple data', () => {

        const title = "Test title";
        const desc = "Test description";
        const initialCount = countCards();

        browser.setValue("#taskTitle", title);
        browser.setValue("#taskDescription", desc);
        browser.click('#createTask');

        assert.equal(countCards(), initialCount+1, "Creating a card did not add a card to the HTML document!");
    });

    it("starts cards in the shortened form", () => {
        assert(!browser.isExisting("#card-list > div > div:nth-child(3) > p"), "Card did not start with a hidden description!");
    });

    it('can expand the cards when clicked', () => {
        browser.click("#card-list > div > div:nth-child(1) > h3");
        assert(browser.isExisting("#card-list > div > div:nth-child(3) > p"), "Card did not show description when clicked");
    });

    it('can mark cards as done when button is clicked', () => {
        browser.click("button.done");
        assert.equal(browser.elements("li.checked").value.length, 1, "Card did not change li class to checked when 'Done' was clicked");
    });

    it('can reopen cards when they are clicked', () => {
        browser.click("button.reopen");
        assert.equal(browser.elements("li.checked").value.length, 0, "Card was not reopened when 'Reopen' was clicked");
    });

    it('can delete todo cards when the button is clicked', () => {
        // browser.click(".delete");
        // assert.equal(countCards(), 0, "Clicking the delete button did not remove the card!");
    });
});
