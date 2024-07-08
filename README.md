# log-soup

Simple utility for logging soup JSON to [debug.tscircuit.com](https://debug.tscircuit.com)

```bash
npm add -D @tscircuit/log-soup
```

## Usage

```ts
import test from "ava"
import { logSoup } from "@tscircuit/log-soup"


test("show me the soup!", async (t) => {
  await logSoup(`log-soup: ${t.title}`, [
    {
      pcb_smtpad_id:"pcb_smtpad_1",
      type:"pcb_smtpad",
      shape:"rect",
      x: 0,
      y: 0
      width: 1,
      height: 2,
      layer:"top",
      pcb_component_id:"pcb_component_1"
      pcb_port_id:"pcb_port_1"
    }
  ])
})
```

You can now view this on https://debug.tscircuit.com:

![image](https://github.com/tscircuit/log-soup/assets/1910070/0aeb3800-fe12-482e-b0b3-d49fa3982325)


