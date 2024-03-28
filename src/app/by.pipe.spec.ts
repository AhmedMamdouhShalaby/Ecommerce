import { ByPipe } from './by.pipe';

describe('ByPipe', () => {
  it('create an instance', () => {
    const pipe = new ByPipe();
    expect(pipe).toBeTruthy();
  });
});
