import { createTest, destroyVM } from '../util';
import SplitterBar from 'packages/splitter-bar';

// 组件输出的类名与 packages/theme-chalk/src/splitter-bar.scss 里 b()/m()/when() 生成的
// 选择器是一份契约：这里断言 cursor / 背景是否真的作用到组件渲染出来的节点上。
// 类名对不上（例如方向写成 el-splitter-bar-vertical），或状态选择器写成后代
// （.el-splitter-bar--vertical .is-drag-locked，而组件是单个 div、状态类挂在自己身上），
// 都会在这里失败。
const styleOf = el => getComputedStyle(el);

describe('SplitterBar', () => {
  const vms = [];
  let vm;

  const create = (props = {}) => {
    vm = createTest(SplitterBar, Object.assign({ index: 0, direction: 'vertical' }, props), true);

    vms.push(vm);
    return vm.$el;
  };

  afterEach(() => {
    vms.splice(0).forEach(item => destroyVM(item));
  });

  it('create', () => {
    const el = create({ size: 200, min: 100, max: 300 });

    expect(el.classList.contains('el-splitter-bar')).to.be.true;
    expect(el.classList.contains('el-splitter-bar--vertical')).to.be.true;
    expect(el.classList.contains('is-drag-normal')).to.be.true;
  });

  it('should be horizontal when direction is horizontal', () => {
    const el = create({ direction: 'horizontal' });

    expect(el.classList.contains('el-splitter-bar--horizontal')).to.be.true;
    expect(el.classList.contains('el-splitter-bar--vertical')).to.be.false;
  });

  it('should get size and background from theme', () => {
    const vertical = create({ size: 200, min: 100, max: 300 });

    expect(styleOf(vertical).width).to.equal('5px');
    expect(styleOf(vertical).backgroundColor).to.equal('rgb(204, 204, 204)');

    const horizontal = create({ direction: 'horizontal', size: 200, min: 100, max: 300 });

    expect(styleOf(horizontal).height).to.equal('5px');
    expect(styleOf(horizontal).backgroundColor).to.equal('rgb(204, 204, 204)');
  });

  it('should match drag state with cursor of theme', () => {
    const cases = [
      { direction: 'vertical', props: { size: 200, min: 100, max: 300 }, state: 'is-drag-normal', cursor: 'col-resize' },
      { direction: 'vertical', props: { size: 100, min: 100, max: 300 }, state: 'is-drag-min-limit', cursor: 'e-resize' },
      { direction: 'vertical', props: { size: 300, min: 100, max: 300 }, state: 'is-drag-max-limit', cursor: 'w-resize' },
      { direction: 'vertical', props: { size: 100, min: 100, max: 100 }, state: 'is-drag-locked', cursor: 'default' },
      { direction: 'horizontal', props: { size: 200, min: 100, max: 300 }, state: 'is-drag-normal', cursor: 'row-resize' },
      { direction: 'horizontal', props: { size: 100, min: 100, max: 300 }, state: 'is-drag-min-limit', cursor: 's-resize' },
      { direction: 'horizontal', props: { size: 300, min: 100, max: 300 }, state: 'is-drag-max-limit', cursor: 'n-resize' },
      { direction: 'horizontal', props: { size: 100, min: 100, max: 100 }, state: 'is-drag-locked', cursor: 'default' }
    ];

    cases.forEach(item => {
      const el = create(Object.assign({ direction: item.direction }, item.props));
      const label = item.direction + ' ' + item.state;

      expect(el.classList.contains(item.state), label + ' 未输出状态类').to.be.true;
      expect(styleOf(el).cursor, label + ' cursor 未命中').to.equal(item.cursor);
    });
  });

  it('should have background when drag is locked', () => {
    const el = create({ size: 100, min: 100, max: 100 });

    expect(styleOf(el).backgroundColor).to.equal('rgb(238, 238, 238)');
  });

  it('should emit start-drag with index and position on mousedown', () => {
    const el = create({ index: 2, size: 200, min: 100, max: 300 });
    const spy = sinon.spy();

    vm.$on('start-drag', spy);
    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, clientX: 120, clientY: 34 }));

    expect(spy.calledOnce).to.be.true;
    expect(spy.args[0][0]).to.deep.equal({ index: 2, clientX: 120, clientY: 34 });
  });
});
