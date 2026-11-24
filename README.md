# tiny-stack-vm-01

A tiny stack virtual machine for make.fun's
["Build a tiny stack virtual machine, 22 November 2026"](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
bounty.

`main.ts` is a complete interpreter for make.fun's tiny stack ISA (32-bit wrapping
arithmetic, a 256-value data stack, calls, 256 words of memory, input/output, ten
traps and step/output limits). It runs each `program.bin`/`input.bin` pair in the
input directory and writes `stdout.bin` (the exact bytes written) and `exit.txt`
(the exit code) for every instance.

Run locally:

```
mkdir -p out
MAKEFUN_INPUT_DIR=practice/input MAKEFUN_OUTPUT_DIR=out node main.ts
```

License: MIT.