Running Builds
------------------------------

Continuous Integration Build:

   run grunt unit
     --> this will run jshint, unit tests and generate a coverage report and exit

Unit Tests
-------------------------------

A) Running UNIT TESTS in Karma / Commandline
    1) run grunt karma:go

B) Running TESTS constantly using WATCH
    1) run grunt
    2) modify any src or test file
    3) it will update the commandline console immediately with test results

B) HTML Spec Runner Generator IF you want to run tests in the browser, this will generate the html file.
   It will also run the tests in the commandline.
    1) run grunt runJasmine
    2) open _specRunner.html from project root in the browser

