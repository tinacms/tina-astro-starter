# 🏁 Final Form Set Field Data

[![NPM Version](https://img.shields.io/npm/v/final-form-set-field-data.svg?style=flat)](https://www.npmjs.com/package/final-form-set-field-data)
[![NPM Downloads](https://img.shields.io/npm/dm/final-form-set-field-data.svg?style=flat)](https://www.npmjs.com/package/final-form-set-field-data)
[![Build Status](https://travis-ci.org/final-form/final-form-set-field-data.svg?branch=master)](https://travis-ci.org/final-form/final-form-set-field-data)
[![codecov.io](https://codecov.io/gh/final-form/final-form-set-field-data/branch/master/graph/badge.svg)](https://codecov.io/gh/final-form/final-form-set-field-data)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

Mutator for setting arbitrary metadata for fields in
[🏁 Final Form](https://github.com/final-form/final-form).

---

## Installation

```bash
npm install --save final-form-set-field-data
```

or

```bash
yarn add final-form-set-field-data
```

## Usage

```js
import { createForm } from 'final-form'
import setFieldData from 'final-form-set-field-data'

// Create Form
const form = createForm({
  mutators: { setFieldData },
  onSubmit
})

form.mutators.setFieldData('firstName', { awesome: true })

form.registerField(
  'firstName',
  fieldState => {
    const { awesome } = fieldState.data // true
  },
  {
    // ...other subscription items
    data: true
  }
)
```

## Mutator

### `form.mutators.setFieldData(name: string, values: Object) => void`

Merges the values provided into the `data` value for the specified field
