import { createVue, destroyVM, waitImmediate } from '../util';

const TEMPLATE = `
  <el-splitter :direction="direction"
    @resize-start="resizeStart"
    @resize="resize"
    @resize-end="resizeEnd">
    <el-splitter-panel :size="300" :min="200" :max="400">A</el-splitter-panel>
    <el-splitter-panel>B</el-splitter-panel>
  </el-splitter>
`;

// 拖拽事件要带坐标：util 的 triggerEvent 走 initEvent，不携带 clientX/clientY
const mouse = (type, clientX, clientY) => new MouseEvent(type, {
  bubbles: true,
  cancelable: true,
  clientX,
  clientY
});

describe('Splitter', () => {
  let vm;
  // 组件事件不会冒泡到根实例，所以用模板上的监听接收（同时验证对外事件名）
  let resizeStart;
  let resize;
  let resizeEnd;

  const create = (direction = 'vertical') => {
    resizeStart = sinon.spy();
    resize = sinon.spy();
    resizeEnd = sinon.spy();
    vm = createVue({
      template: TEMPLATE,
      data() {
        return { direction };
      },
      methods: { resizeStart, resize, resizeEnd }
    }, true);
    return vm.$el;
  };

  const firstPanel = el => el.querySelector('.el-splitter-panel');

  const bar = el => el.querySelector('.el-splitter-bar');

  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    const el = create();

    expect(el.classList.contains('el-splitter')).to.be.true;
    expect(el.classList.contains('el-splitter--vertical')).to.be.true;
    expect(getComputedStyle(el).flexDirection).to.equal('row');
    expect(el.querySelectorAll('.el-splitter-panel').length).to.equal(2);
    // N 个面板之间插入 N-1 根分割条
    expect(el.querySelectorAll('.el-splitter-bar').length).to.equal(1);
    // 第一个面板用 size，最后一个面板撑满剩余空间
    expect(firstPanel(el).style.width).to.equal('300px');
    expect(el.querySelectorAll('.el-splitter-panel')[1].style.width).to.equal('0px');
  });

  it('should be column when direction is horizontal', () => {
    const el = create('horizontal');

    expect(el.classList.contains('el-splitter--horizontal')).to.be.true;
    expect(el.classList.contains('el-splitter--vertical')).to.be.false;
    expect(getComputedStyle(el).flexDirection).to.equal('column');
  });

  it('should resize panel when dragging bar', async() => {
    const el = create();
    const handle = bar(el);
    const panel = firstPanel(el);

    handle.dispatchEvent(mouse('mousedown', 300, 100));
    expect(resizeStart.calledOnce).to.be.true;
    expect(resizeStart.args[0][0]).to.equal(0);

    document.dispatchEvent(mouse('mousemove', 250, 100));
    await waitImmediate();
    expect(panel.style.width).to.equal('250px');
    expect(handle.classList.contains('is-drag-normal')).to.be.true;
    expect(resize.calledWith(0)).to.be.true;

    document.dispatchEvent(mouse('mouseup', 250, 100));
    expect(resizeEnd.calledOnce).to.be.true;
  });

  it('should clamp size to min and max when dragging out of range', async() => {
    const el = create();
    const handle = bar(el);
    const panel = firstPanel(el);

    handle.dispatchEvent(mouse('mousedown', 300, 100));
    document.dispatchEvent(mouse('mousemove', 100, 100)); // 300 - 200 = 100 < min 200
    await waitImmediate();
    expect(panel.style.width).to.equal('200px');
    expect(handle.classList.contains('is-drag-min-limit')).to.be.true;

    document.dispatchEvent(mouse('mousemove', -200, 100)); // 继续越界，仍停在 min
    await waitImmediate();
    expect(panel.style.width).to.equal('200px');
    document.dispatchEvent(mouse('mouseup', -200, 100));

    handle.dispatchEvent(mouse('mousedown', 300, 100)); // 从 min 重新起拖
    document.dispatchEvent(mouse('mousemove', 600, 100)); // 200 + 300 = 500 > max 400
    await waitImmediate();
    expect(panel.style.width).to.equal('400px');
    expect(handle.classList.contains('is-drag-max-limit')).to.be.true;
    document.dispatchEvent(mouse('mouseup', 600, 100));
  });

  it('should not resize after mouseup', async() => {
    const el = create();
    const handle = bar(el);
    const panel = firstPanel(el);

    handle.dispatchEvent(mouse('mousedown', 300, 100));
    document.dispatchEvent(mouse('mousemove', 250, 100));
    await waitImmediate();
    expect(panel.style.width).to.equal('250px');
    document.dispatchEvent(mouse('mouseup', 250, 100));

    document.dispatchEvent(mouse('mousemove', 100, 100)); // mouseup 时已移除监听
    await waitImmediate();
    expect(panel.style.width).to.equal('250px');
  });

  it('should resize by clientY when direction is horizontal', async() => {
    const el = create('horizontal');
    const handle = bar(el);
    const panel = firstPanel(el);

    expect(panel.style.height).to.equal('300px');

    handle.dispatchEvent(mouse('mousedown', 100, 300));
    document.dispatchEvent(mouse('mousemove', 100, 250)); // 上拖 50
    await waitImmediate();
    expect(panel.style.height).to.equal('250px');
    document.dispatchEvent(mouse('mouseup', 100, 250));
  });
});
