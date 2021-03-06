'use strict';

const { join } = require('path');

require('./check-env');

const { env } = process;

exports.aesKeyLength = 256 / 8; // AES Key Length (bytes).
exports.aesAlgName = 'aes256'; // Ciphering algorithm name.
exports.aesIVLength = 128 / 8; // Initialization Vector length (bytes).

exports.changeLogSuffix = '-clog.txt';

exports.innerDir = join(process.env.HOME, '.db-presets');

exports.currentPresetInfoFile = join(exports.innerDir, 'cur-preset.json');

exports.branchDir = join(env.DBP_PRESETS_DIR, env.DBP_REPO, env.DBP_BRANCH);
exports.branchDirArc = join(exports.branchDir, 'arc');
exports.branchDirSql = join(exports.branchDir, 'sql');
exports.branchDirData = join(exports.branchDir, 'data');

exports.arcExt = '.tar.xz';
exports.sqlExt = '.sql';

exports.s3KeyPrefix = `${process.env.DBP_REPO}/${process.env.DBP_BRANCH}`;

exports.critErrPrefix = 'DB_P_CRIT_ERR: ';

// По этому префиксу в error.message можно определить, что была критичная ошибка из db_p.
// Понадобится внутри тестов.
exports.rethrow = function rethrow(e) {
  e.message = `${exports.critErrPrefix}${e.message}`;
  throw e;
};
