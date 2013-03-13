/* string lexer
 * v0.1a
 * by Jason "Palamedes" Ellis <jason.ellis@yahoo.com>
 *
 * The purpose of this file is ultimately to write a csv to array function in javascript that will correctly parse
 * out any kind of csv file to include the ability to easily add tsv or whatever.
 *
 * This is meant to be a lexer that will take parameters and allow for any kind of use. There are other csv2array
 * products out there but most of them don't fit my needs, specifically allowing something like;
 * "a",1,"b\"c\"d",2,"e"  <- 3 columns
 * "col","foo\t bar\n\r \"Baz\",foo,bar","col"  <- 3 columns
 */

jsStringLexer = {

    // data helpers
    data : '',
    separator : '',
    results : [],

    reset : function () {
        this.results = [];
    },

    parse : function() {
        this.reset();
        // Initial values
        var line = [];
        var value = '';
        var escapeNext = false;
        var insideQuote = false;
        // Preparse data
        var data = this.preParse();
        // lex through and do stuff
        for(var t = 0; t <= data.length; t++) {
            // if we are at the end of the data and what we have isn't empty
            if (t == data.length && value != '') {
                line.push(value);
                this.results.push(line);
                // if we are at a separator and not inside a quote
            } else if (data[t] == this.separator && insideQuote == false) {
                line.push(value);
                value = '';
                // if we are at a carriage return
            } else if (/\r/.test(data[t])) {
                line.push(value);
                // push it to results
                this.results.push(line);
                // reset
                line = [];
                value = '';
                escapeNext = false;
                insideQuote = false;
                // Else
            } else {
                // If it's an escape then set that the next thing is to be escaped and then continue
                if (/\\/.test(data[t])) {
                    escapeNext = true;
                    continue;
                }
                // if its a quote and not escaped then toggle inside quote and continue
                if (/"/.test(data[t]) && !escapeNext) {
                    insideQuote = (insideQuote)?false:true;
                    continue;
                }
                // skip \n entirely
                if (/\n/.test(data[t])) {
                    continue;
                }
                // if we are escaping the next character then what type is it?
                if (escapeNext) {
                    if (/"/.test(data[t])) {
                        value += data[t];
                    } else {
                        value += "\\" + data[t];
                    }
                    escapeNext = false;
                    continue;
                }
                // Okay it made it here so just append the character
                value += data[t];
            }
        }
    },

    preParse : function() {
        return this.data;
    },

    csv2array : function(data) {
        this.data = data;
        this.separator = ',';
        this.parse();
        return this.results;
    }

};

