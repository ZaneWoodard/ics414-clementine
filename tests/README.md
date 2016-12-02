# Tests

These are rudimentary tests that operate on the browser level. They work through a suite of browser automation tools,
built-in testing tools for NodeJS and MeteorJS, and the a load of other frameworks.

These tests allow us to automatically simulate user iteraction with the website UI, and check the results.

# Dependencies

These tests rely on an insane amount of JS frameworks. I do not recommend running them unless it is essential.
Here are just some of the fr3ameworks that must be installed:
Chai
Assert via NPM
Selenium
Chimp

# Results

In case you don't want to download those frameworks and run the tests yourself, here are the results of the tests
at the time of this commit:
$ sudo meteor npm run chimp-test

> clementine@ chimp-test /Users/zane/WebstormProjects/ics414-clementine
> chimp --mocha --path=tests --browser=chrome



[chimp] Running...


  kanban board
    ✓ can create a todo card with simple data
    ✓ starts cards in the shortened form
    ✓ can expand the cards when clicked
    ✓ can mark cards as done when button is clicked
    ✓ can reopen cards when they are clicked
    ✓ can delete todo cards when the button is clicked


  6 passing (3s)


