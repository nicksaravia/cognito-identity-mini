function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var parcelRequire = $parcel$global["parcelRequire9a03"];
parcelRequire.register("irjQh", function(module, exports) {

$parcel$export(module.exports, "toFormData", () => $d6ca23df4ab45b52$export$10ae0d317ea97f8b);

var $lEn7z = parcelRequire("lEn7z");

var $iMjgz = parcelRequire("iMjgz");
let $d6ca23df4ab45b52$var$s = 0;
const $d6ca23df4ab45b52$var$S = {
    START_BOUNDARY: $d6ca23df4ab45b52$var$s++,
    HEADER_FIELD_START: $d6ca23df4ab45b52$var$s++,
    HEADER_FIELD: $d6ca23df4ab45b52$var$s++,
    HEADER_VALUE_START: $d6ca23df4ab45b52$var$s++,
    HEADER_VALUE: $d6ca23df4ab45b52$var$s++,
    HEADER_VALUE_ALMOST_DONE: $d6ca23df4ab45b52$var$s++,
    HEADERS_ALMOST_DONE: $d6ca23df4ab45b52$var$s++,
    PART_DATA_START: $d6ca23df4ab45b52$var$s++,
    PART_DATA: $d6ca23df4ab45b52$var$s++,
    END: $d6ca23df4ab45b52$var$s++
};
let $d6ca23df4ab45b52$var$f = 1;
const $d6ca23df4ab45b52$var$F = {
    PART_BOUNDARY: $d6ca23df4ab45b52$var$f,
    LAST_BOUNDARY: $d6ca23df4ab45b52$var$f *= 2
};
const $d6ca23df4ab45b52$var$LF = 10;
const $d6ca23df4ab45b52$var$CR = 13;
const $d6ca23df4ab45b52$var$SPACE = 32;
const $d6ca23df4ab45b52$var$HYPHEN = 45;
const $d6ca23df4ab45b52$var$COLON = 58;
const $d6ca23df4ab45b52$var$A = 97;
const $d6ca23df4ab45b52$var$Z = 122;
const $d6ca23df4ab45b52$var$lower = (c)=>c | 0x20;
const $d6ca23df4ab45b52$var$noop = ()=>{};
class $d6ca23df4ab45b52$var$MultipartParser {
    /**
	 * @param {Uint8Array} data
	 */ write(data) {
        let i = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind: lookbehind , boundary: boundary , boundaryChars: boundaryChars , index: index , state: state , flags: flags  } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name)=>{
            this[name + "Mark"] = i;
        };
        const clear = (name)=>{
            delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a)=>{
            if (start === undefined || start !== end) this[callbackSymbol](ui8a && ui8a.subarray(start, end));
        };
        const dataCallback = (name, clear)=>{
            const markSymbol = name + "Mark";
            if (!(markSymbol in this)) return;
            if (clear) {
                callback(name, this[markSymbol], i, data);
                delete this[markSymbol];
            } else {
                callback(name, this[markSymbol], data.length, data);
                this[markSymbol] = 0;
            }
        };
        for(i = 0; i < length_; i++){
            c = data[i];
            switch(state){
                case $d6ca23df4ab45b52$var$S.START_BOUNDARY:
                    if (index === boundary.length - 2) {
                        if (c === $d6ca23df4ab45b52$var$HYPHEN) flags |= $d6ca23df4ab45b52$var$F.LAST_BOUNDARY;
                        else if (c !== $d6ca23df4ab45b52$var$CR) return;
                        index++;
                        break;
                    } else if (index - 1 === boundary.length - 2) {
                        if (flags & $d6ca23df4ab45b52$var$F.LAST_BOUNDARY && c === $d6ca23df4ab45b52$var$HYPHEN) {
                            state = $d6ca23df4ab45b52$var$S.END;
                            flags = 0;
                        } else if (!(flags & $d6ca23df4ab45b52$var$F.LAST_BOUNDARY) && c === $d6ca23df4ab45b52$var$LF) {
                            index = 0;
                            callback("onPartBegin");
                            state = $d6ca23df4ab45b52$var$S.HEADER_FIELD_START;
                        } else return;
                        break;
                    }
                    if (c !== boundary[index + 2]) index = -2;
                    if (c === boundary[index + 2]) index++;
                    break;
                case $d6ca23df4ab45b52$var$S.HEADER_FIELD_START:
                    state = $d6ca23df4ab45b52$var$S.HEADER_FIELD;
                    mark("onHeaderField");
                    index = 0;
                // falls through
                case $d6ca23df4ab45b52$var$S.HEADER_FIELD:
                    if (c === $d6ca23df4ab45b52$var$CR) {
                        clear("onHeaderField");
                        state = $d6ca23df4ab45b52$var$S.HEADERS_ALMOST_DONE;
                        break;
                    }
                    index++;
                    if (c === $d6ca23df4ab45b52$var$HYPHEN) break;
                    if (c === $d6ca23df4ab45b52$var$COLON) {
                        if (index === 1) // empty header field
                        return;
                        dataCallback("onHeaderField", true);
                        state = $d6ca23df4ab45b52$var$S.HEADER_VALUE_START;
                        break;
                    }
                    cl = $d6ca23df4ab45b52$var$lower(c);
                    if (cl < $d6ca23df4ab45b52$var$A || cl > $d6ca23df4ab45b52$var$Z) return;
                    break;
                case $d6ca23df4ab45b52$var$S.HEADER_VALUE_START:
                    if (c === $d6ca23df4ab45b52$var$SPACE) break;
                    mark("onHeaderValue");
                    state = $d6ca23df4ab45b52$var$S.HEADER_VALUE;
                // falls through
                case $d6ca23df4ab45b52$var$S.HEADER_VALUE:
                    if (c === $d6ca23df4ab45b52$var$CR) {
                        dataCallback("onHeaderValue", true);
                        callback("onHeaderEnd");
                        state = $d6ca23df4ab45b52$var$S.HEADER_VALUE_ALMOST_DONE;
                    }
                    break;
                case $d6ca23df4ab45b52$var$S.HEADER_VALUE_ALMOST_DONE:
                    if (c !== $d6ca23df4ab45b52$var$LF) return;
                    state = $d6ca23df4ab45b52$var$S.HEADER_FIELD_START;
                    break;
                case $d6ca23df4ab45b52$var$S.HEADERS_ALMOST_DONE:
                    if (c !== $d6ca23df4ab45b52$var$LF) return;
                    callback("onHeadersEnd");
                    state = $d6ca23df4ab45b52$var$S.PART_DATA_START;
                    break;
                case $d6ca23df4ab45b52$var$S.PART_DATA_START:
                    state = $d6ca23df4ab45b52$var$S.PART_DATA;
                    mark("onPartData");
                // falls through
                case $d6ca23df4ab45b52$var$S.PART_DATA:
                    previousIndex = index;
                    if (index === 0) {
                        // boyer-moore derrived algorithm to safely skip non-boundary data
                        i += boundaryEnd;
                        while(i < bufferLength && !(data[i] in boundaryChars))i += boundaryLength;
                        i -= boundaryEnd;
                        c = data[i];
                    }
                    if (index < boundary.length) {
                        if (boundary[index] === c) {
                            if (index === 0) dataCallback("onPartData", true);
                            index++;
                        } else index = 0;
                    } else if (index === boundary.length) {
                        index++;
                        if (c === $d6ca23df4ab45b52$var$CR) // CR = part boundary
                        flags |= $d6ca23df4ab45b52$var$F.PART_BOUNDARY;
                        else if (c === $d6ca23df4ab45b52$var$HYPHEN) // HYPHEN = end boundary
                        flags |= $d6ca23df4ab45b52$var$F.LAST_BOUNDARY;
                        else index = 0;
                    } else if (index - 1 === boundary.length) {
                        if (flags & $d6ca23df4ab45b52$var$F.PART_BOUNDARY) {
                            index = 0;
                            if (c === $d6ca23df4ab45b52$var$LF) {
                                // unset the PART_BOUNDARY flag
                                flags &= ~$d6ca23df4ab45b52$var$F.PART_BOUNDARY;
                                callback("onPartEnd");
                                callback("onPartBegin");
                                state = $d6ca23df4ab45b52$var$S.HEADER_FIELD_START;
                                break;
                            }
                        } else if (flags & $d6ca23df4ab45b52$var$F.LAST_BOUNDARY) {
                            if (c === $d6ca23df4ab45b52$var$HYPHEN) {
                                callback("onPartEnd");
                                state = $d6ca23df4ab45b52$var$S.END;
                                flags = 0;
                            } else index = 0;
                        } else index = 0;
                    }
                    if (index > 0) // when matching a possible boundary, keep a lookbehind reference
                    // in case it turns out to be a false lead
                    lookbehind[index - 1] = c;
                    else if (previousIndex > 0) {
                        // if our boundary turned out to be rubbish, the captured lookbehind
                        // belongs to partData
                        const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                        callback("onPartData", 0, previousIndex, _lookbehind);
                        previousIndex = 0;
                        mark("onPartData");
                        // reconsider the current character even so it interrupted the sequence
                        // it could be the beginning of a new sequence
                        i--;
                    }
                    break;
                case $d6ca23df4ab45b52$var$S.END:
                    break;
                default:
                    throw new Error(`Unexpected state entered: ${state}`);
            }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        // Update properties for the next call
        this.index = index;
        this.state = state;
        this.flags = flags;
    }
    end() {
        if (this.state === $d6ca23df4ab45b52$var$S.HEADER_FIELD_START && this.index === 0 || this.state === $d6ca23df4ab45b52$var$S.PART_DATA && this.index === this.boundary.length) this.onPartEnd();
        else if (this.state !== $d6ca23df4ab45b52$var$S.END) throw new Error("MultipartParser.end(): stream ended unexpectedly");
    }
    /**
	 * @param {string} boundary
	 */ constructor(boundary){
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = $d6ca23df4ab45b52$var$noop;
        this.onHeaderField = $d6ca23df4ab45b52$var$noop;
        this.onHeadersEnd = $d6ca23df4ab45b52$var$noop;
        this.onHeaderValue = $d6ca23df4ab45b52$var$noop;
        this.onPartBegin = $d6ca23df4ab45b52$var$noop;
        this.onPartData = $d6ca23df4ab45b52$var$noop;
        this.onPartEnd = $d6ca23df4ab45b52$var$noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for(let i = 0; i < boundary.length; i++){
            ui8a[i] = boundary.charCodeAt(i);
            this.boundaryChars[ui8a[i]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = $d6ca23df4ab45b52$var$S.START_BOUNDARY;
    }
}
function $d6ca23df4ab45b52$var$_fileName(headerValue) {
    // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
    const m = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
    if (!m) return;
    const match = m[2] || m[3] || "";
    let filename = match.slice(match.lastIndexOf("\\") + 1);
    filename = filename.replace(/%22/g, '"');
    filename = filename.replace(/&#(\d{4});/g, (m, code)=>{
        return String.fromCharCode(code);
    });
    return filename;
}
async function $d6ca23df4ab45b52$export$10ae0d317ea97f8b(Body, ct) {
    if (!/multipart/i.test(ct)) throw new TypeError("Failed to fetch");
    const m = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
    if (!m) throw new TypeError("no or bad content-type header, no multipart boundary");
    const parser = new $d6ca23df4ab45b52$var$MultipartParser(m[1] || m[2]);
    let headerField;
    let headerValue;
    let entryValue;
    let entryName;
    let contentType;
    let filename;
    const entryChunks = [];
    const formData = new (0, $iMjgz.FormData)();
    const onPartData = (ui8a)=>{
        entryValue += decoder.decode(ui8a, {
            stream: true
        });
    };
    const appendToFile = (ui8a)=>{
        entryChunks.push(ui8a);
    };
    const appendFileToFormData = ()=>{
        const file = new (0, $lEn7z.File)(entryChunks, filename, {
            type: contentType
        });
        formData.append(entryName, file);
    };
    const appendEntryToFormData = ()=>{
        formData.append(entryName, entryValue);
    };
    const decoder = new TextDecoder("utf-8");
    decoder.decode();
    parser.onPartBegin = function() {
        parser.onPartData = onPartData;
        parser.onPartEnd = appendEntryToFormData;
        headerField = "";
        headerValue = "";
        entryValue = "";
        entryName = "";
        contentType = "";
        filename = null;
        entryChunks.length = 0;
    };
    parser.onHeaderField = function(ui8a) {
        headerField += decoder.decode(ui8a, {
            stream: true
        });
    };
    parser.onHeaderValue = function(ui8a) {
        headerValue += decoder.decode(ui8a, {
            stream: true
        });
    };
    parser.onHeaderEnd = function() {
        headerValue += decoder.decode();
        headerField = headerField.toLowerCase();
        if (headerField === "content-disposition") {
            // matches either a quoted-string or a token (RFC 2616 section 19.5.1)
            const m = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
            if (m) entryName = m[2] || m[3] || "";
            filename = $d6ca23df4ab45b52$var$_fileName(headerValue);
            if (filename) {
                parser.onPartData = appendToFile;
                parser.onPartEnd = appendFileToFormData;
            }
        } else if (headerField === "content-type") contentType = headerValue;
        headerValue = "";
        headerField = "";
    };
    for await (const chunk of Body)parser.write(chunk);
    parser.end();
    return formData;
}

});


//# sourceMappingURL=multipart-parser.f3fa1cd9.js.map
