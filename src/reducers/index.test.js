import test from 'ava';
import { SELECT_BUCKET } from '../constants';
import { selectBucket } from './index';

test('should set the current bucket', t => {
  const state = [];
  const action = {
    type: SELECT_BUCKET,
    bucket: 'beer-sample',
  };
  const result = {
    bucket: 'beer-sample',
  };

  t.deepEqual(selectBucket(state, action), result);
});
