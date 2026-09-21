import { createTest, createVue, destroyVM } from '../util';
import SplitterPanel from 'packages/splitter-panel';

describe('SplitterPanel', () => {
  const vms = [];

  const create = (props = {}) => {
    const vm = createTest(SplitterPanel, Object.assign({ index: 0, direction: 'vertical' }, props), true);

    vms.push(vm);
    return vm.$el;
  };

  afterEach(() => {
    vms.splice(0).forEach(item => destroyVM(item));
  });

  it('create', () => {
    const el = create({ size: 200, min: 100, max: 300 });

    expect(el.classList.contains('el-splitter-panel')).to.be.true;
    expect(el.style.width).to.equal('200px');
  });

  it('should clamp size to min and max', () => {
    expect(create({ size: 10, min: 100, max: 300 }).style.width).to.equal('100px');
    expect(create({ size: 400, min: 100, max: 300 }).style.width).to.equal('300px');
  });

  it('should use height when direction is horizontal', () => {
    const el = create({ direction: 'horizontal', size: 200, min: 100, max: 300 });

    expect(el.style.height).to.equal('200px');
    expect(el.style.width).to.equal('');
  });

  it('should fill remaining space when canChange is false', () => {
    const el = create({ canChange: false, size: 200 });

    expect(el.style.width).to.equal('0px');
    expect(getComputedStyle(el).flexGrow).to.equal('1');
  });

  it('should render slot content', () => {
    const vm = createVue({ template: '<el-splitter-panel :index="0" :size="100" :min="50" :max="200">content</el-splitter-panel>' }, true);

    vms.push(vm);
    expect(vm.$el.textContent.trim()).to.equal('content');
  });
});
