/* A revamped version of tinytest.js */

/* TODOS 

DONE: Get success to be green --> Line 20
DONE: Make sure only one error per failure goes to the console
DONE: Make failures red
DONE: Show stack traces for failures
DONE: Only show stack traces if you click expand
DONE: Output summary statistis to the DOM

*/
var TinyTestUtils = {
    renderStats: function (tests, failures) {
        var numberOfTestCases = Object.keys(tests).length;
        var successes = numberOfTestCases - failures;
        var summaryContent = 'Ran ' + numberOfTestCases + ' Tests' + ':' + ' ' + successes + ' Passed' + ', ' + failures + ' Failed';

        //DOM manipulation
        var summaryElement = document.createElement('h1');
        summaryElement.textContent = summaryContent;
        document.body.appendChild(summaryElement);
    }
}

var TinyTest = {
    run: function (tests) {
        var failures = 0;
        for (var testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c' + testName, "color: green;"); //%c is used mention from where the color should be provided
            } catch (e) {
                failures++;
                //Check console group documentation in google developer docs for javascript
                console.groupCollapsed('%c' + testName, "color: red;"); //%c is used mention from where the color should be provided
                console.error(e.stack);
                console.groupEnd('%c' + testName, "color: red;"); //%c is used mention from where the color should be provided
            }
        }
        setTimeout(function () { // Give document a chance to complete --> see the documentation that you have written
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                //rendering Stats
                TinyTestUtils.renderStats(tests, failures);
            }
        }, 0);
    },

    fail: function (msg) {
        throw new Error('fail(): ' + msg);
    },

    assert: function (value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function (expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function (expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail = TinyTest.fail.bind(TinyTest),
    assert = TinyTest.assert.bind(TinyTest),
    assertEquals = TinyTest.assertEquals.bind(TinyTest),
    eq = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests = TinyTest.run.bind(TinyTest);
