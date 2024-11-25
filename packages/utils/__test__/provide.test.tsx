import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProvideCom from './provide/index.vue';
import { nextTick } from 'vue';
import { DataResult } from './provide/coms/type';

const ClassConfig = {
  addBtn: '.provide-add',
  removeBtn: '.provide-remove',
  widthInput: '.provide-width',
  heightInput: '.provide-height',
  plBtn: '.pl-btn',
  nameInput: '.provide-name-input',
};

const name = '辛辛苦苦写bug的张三竟然还是买不起房子';

describe('provide', () => {
  it('测试provide', async () => {
    const rootIns = mount(ProvideCom);
    await nextTick();
    const nameInput = rootIns.find<HTMLInputElement>(ClassConfig.nameInput);
    nameInput.element.value = name;
    nameInput.trigger('input');
    const addBtnLen = rootIns.findAll(ClassConfig.addBtn).length;
    expect(addBtnLen).toBe(1);
    rootIns.find(ClassConfig.addBtn).find(ClassConfig.plBtn).trigger('click');
    await nextTick();
    rootIns.findAll<HTMLInputElement>(ClassConfig.widthInput).forEach(item => {
      item.element.value = '10';
      item.trigger('input');
    });
    rootIns.findAll<HTMLInputElement>(ClassConfig.heightInput).forEach(item => {
      item.element.value = '20';
      item.trigger('input');
    });
    expect(rootIns.findAll(ClassConfig.addBtn).length).toBe(2);
    await nextTick();
    rootIns.find(ClassConfig.removeBtn).find(ClassConfig.plBtn).trigger('click');
    await nextTick();
    expect(rootIns.findAll(ClassConfig.addBtn).length).toBe(1);
    const data: DataResult = (await rootIns.vm.handleSubmit())!;
    expect(data).not.toBe(undefined);
    expect(data.name).toBe(name);
    expect(data.settingData.length).toBe(1);
    expect(data.settingData[0].width).toBe('10');
    expect(data.settingData[0].height).toBe('20');
    expect(data.settingData[0].id).toBe(2);
  });
});
