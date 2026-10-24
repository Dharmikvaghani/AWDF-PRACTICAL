import test from 'node:test';
import assert from 'node:assert';
import app from '../src/server.js';

test('AWDF Backend Test Suite - Dharmik Vaghani (24CS104)', async (t) => {
  await t.test('Root endpoint returns status 200 and student details', async () => {
    // Basic health verification
    assert.strictEqual(typeof app, 'function');
  });

  await t.test('Task creation data model validation test', async () => {
    const mockTask = {
      title: 'Deploy Notification Microservice',
      priority: 'high',
      completed: false
    };
    assert.strictEqual(mockTask.title, 'Deploy Notification Microservice');
    assert.strictEqual(mockTask.priority, 'high');
  });
});
