import { assert } from 'chai';
import { formmatDateOnSlug } from './date';

describe('utils', () => {
  describe('date', () => {
    describe('formatDateOnSlug', () => {
      it('should convert from date string to the valid date pattern', () => {
        const date = '2021-10-10';

        assert.equal(formmatDateOnSlug(date), '10-10-2021');
      });

      it('should convert from number to the valid date pattern', () => {
        const date = new Date(2021, 9, 10).valueOf();

        assert.equal(formmatDateOnSlug(date), '10-10-2021');
      });
    });
  });
});