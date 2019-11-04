'use strict';

const { readFileSync } = require('fs');
const { join } = require('path');

const [,, ...args] = process.argv;

if (['-h', '--help'].includes(args[0])) {
  if (args[1] === 'env') {
    const envHelp = readFileSync(join(__dirname, '..', 'docs', 'env-vars.md'), 'utf-8');
    console.log(envHelp);
    process.exit(0);
  }

  console.log('Документация тут: https://github.com/Dzenly/db-presets');

  console.log(`Памятка по параметрам:

-h или --help - эта помощь.
-h env - помощь по переменным окружения.

gen-key - сгенерить ключ.
pull-and-update-local [include=name1,name2] [exclude=name3,name4] - стянуть пресеты.
db-p push-new name=my-preset who=my-name desc=description - залить пресет на амазон.
db-p set-lock name=my-preset who=my-name desc=description - блокировка пресета на запись на амазоне.
db-p get-lock name=my-preset - проверка блокировки.
db-p push-ex name=my-preset lock-key=my-key who=my-name desc=description - обновление пресета на S3.
db-p select preset-name clean=yes - выбор пресета.
  `)

}
