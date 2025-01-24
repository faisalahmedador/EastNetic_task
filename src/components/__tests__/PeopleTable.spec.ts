import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PeopleTable from '@/components/people-table.vue'

describe('PeopleList Timer', () => {
  it('starts the timer when count changes', async () => {
    vi.useFakeTimers();

    const wrapper = mount(PeopleTable, { props: { count: 3 } });
    expect(wrapper.vm.timerActive).toBe(false);

    await wrapper.setProps({ count: 5 });
    expect(wrapper.vm.timerActive).toBe(true);
    expect(wrapper.vm.timerDuration).toBe(30);

    vi.advanceTimersByTime(1000); // Simulate 1 second
    expect(wrapper.vm.timerDuration).toBe(29);

    vi.clearAllTimers();
  });

  it('stops the timer when count is reset', async () => {
    vi.useFakeTimers();

    const wrapper = mount(PeopleTable, { props: { count: 3 } });
    await wrapper.setProps({ count: 5 });
    expect(wrapper.vm.timerActive).toBe(true);

    await wrapper.setProps({ count: null });
    expect(wrapper.vm.timerActive).toBe(false);

    vi.clearAllTimers();
  });
});

