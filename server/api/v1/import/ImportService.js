import * as fs from 'fs';

import XLSX from 'xlsx';

import {
  asyncForEach,
  setNullToEmptyValues,
} from '../../../../utils/functions';
import models from '../../../models';

const { Fair } = models;

class ImportService {
  async fairsXls(file) {
    try {
      const workbook = XLSX.readFile(file.path);
      const ws = workbook.Sheets[workbook.SheetNames[2]];
      const data = XLSX.utils.sheet_to_json(ws, { defval: '' });
      const fairs = [];
      await asyncForEach(data, async (line) => {
        const fair = {
          long: setNullToEmptyValues(line['LONG']),
          lat: setNullToEmptyValues(line['LAT']),
          setcens: setNullToEmptyValues(line['SETCENS']),
          areap: setNullToEmptyValues(line['AREAP']),
          coddist: setNullToEmptyValues(line['CODDIST']),
          distrito: setNullToEmptyValues(line['DISTRITO']),
          codsubpref: setNullToEmptyValues(line['CODSUBPREF']),
          subprefe: setNullToEmptyValues(line['SUBPREFE']),
          regiao5: setNullToEmptyValues(line['REGIAO5']),
          regiao8: setNullToEmptyValues(line['REGIAO8']),
          nomeFeira: setNullToEmptyValues(line['NOME_FEIRA']),
          registro: setNullToEmptyValues(line['REGISTRO']),
          logradouro: setNullToEmptyValues(line['LOGRADOURO']),
          numero: setNullToEmptyValues(line['NUMERO']),
          bairro: setNullToEmptyValues(line['BAIRRO']),
          active: true,
        };
        fairs.push(fair);
      });
      Fair.bulkCreate(fairs);
      fs.unlink(file.path, (err) => {
        if (err) {
          console.error(err);
        }
      });
    } catch (e) {
      console.error('error', e);
      throw e;
    }
  }
}

export default new ImportService();
