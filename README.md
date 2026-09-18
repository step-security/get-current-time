[![StepSecurity Maintained Action](https://raw.githubusercontent.com/step-security/maintained-actions-assets/main/assets/maintained-action-banner.png)](https://docs.stepsecurity.io/actions/stepsecurity-maintained-actions)

# Get Current Time Github Action

This action sets the current ISO8601 time to the `time` output and also provides `readableTime`, `formattedTime`, and
many more digital outputs like `year`, `day`, `second`, etc. Useful for setting build times in subsequent steps,
renaming your artifact, or keeping the same recorded time for the entire workflow.

You can view some typical input/output in the [action.test.js](./action.test.js) file.

## Inputs

### `format`

Time format to use - using [MomentJS format syntax](https://momentjs.com/docs/#/displaying/format/) - optional

### `utcOffset`

UTC offset to use - using [MomentJS utcOffset syntax](https://momentjs.com/docs/#/manipulating/utc-offset/) - optional

### `timezone`

Timezone to use - check [moment-timezone list](https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a) -
optional, if set, utcOffset will be ignored, e.g. "America/Los_Angeles"

## Outputs

### `time`

The ISO time this action was run, **not** affected by the parameter `utcOffset`  e.g. '2020-01-01T00:30:15.000Z'

### `ISOTime`

Same as `time`

### `readableTime`

Human-friendly time - affected by the parameter `utcOffset`  e.g. 'Wed Jan 01 2020 08:30:15 GMT+0800'

### `formattedTime`

The time this action was run - formatted using `format` and `utcOffset` inputs

### `year,month,day,hour,minute,second,millisecond`

Digital outputs, just as names

## Example usage

```yaml
steps:
  - name: Get current time
    uses: step-security/get-current-time@v2
    id: current-time
    with:
      format: YYYYMMDD-HH
      utcOffset: "+08:00"
  - name: Use current time
    env:
      TIME: "${{ steps.current-time.outputs.time }}"
      R_TIME: "${{ steps.current-time.outputs.readableTime }}"
      F_TIME: "${{ steps.current-time.outputs.formattedTime }}"
      YEAR: "${{ steps.current-time.outputs.year }}"
      DAY: "${{ steps.current-time.outputs.day }}"
    run: echo $TIME $R_TIME $F_TIME $YEAR $DAY
```

## Run locally

### First

```
npm install
```

### Build

```
npm start
```

And you'll see the index.js is generated in the dist folder

### Test

```
npm test
```

And you'll see the console output as following:

***

**PASS**  ./action.test.js

&ensp;&ensp;action

&ensp;&ensp;&ensp;&ensp;**√** Should load (1 ms)

&ensp;&ensp;&ensp;&ensp;**√** Should correctly set outputs (1 ms)

&ensp;&ensp;&ensp;&ensp;**√** Should correctly set outputs with utcOffset (1 ms)

&ensp;&ensp;&ensp;&ensp;**√** Should correctly set outputs with timezone (1 ms)

&ensp;&ensp;&ensp;&ensp;**√** Should throw error (1 ms)

| File            | %&nbsp;Stmts | %&nbsp;Branch | %&nbsp;Funcs | %&nbsp;Lines | Uncovered&nbsp;Line&nbsp;#s |
|-----------------|--------------|---------------|--------------|--------------|-----------------------------|
| All files       | 100          | 100           | 100          | 100          |                             |
| &nbsp;action.js | 100          | 100           | 100          | 100          |                             |

Test Suites: **1 passed**, 1 total

Tests:       **5 passed**, 5 total

Snapshots:   0 total

Time:        1 s

Ran all test suites.

***
