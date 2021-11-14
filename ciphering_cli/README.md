# Ciphering CLI Tool

This tool encodes and decodes text using 3 substitution ciphers:
- Caesar cipher (with shift 1)
- Atbash cipher
- ROT-8

# How to use

Run the command "node ciphering_cli" in your terminal with the following parameters:

1.  **-c, --config** (required): config for ciphers.
Config is a string with pattern `{XY(-)}n`, where:
    * X is a cipher mark:
        * C is for Caesar cipher (with shift 1)
        * A is for Atbash cipher
        * R is for ROT-8 cipher
    * Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
        * `1` is for encoding
        * `0` is for decoding
2.  **-i, --input**: a path to input file. If not specified, the text will be read from the terminal
3.  **-o, --output**: a path to output file. If not specified, the result will be printed to the terminal