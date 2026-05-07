import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
  "id": "agent-queue-1",
  "title": "エージェント作業キュー・再開ノート・文書同期 サンプル 1",
  "taskId": "queue-001",
  "queueStatus": "ready",
  "resumeNote": "次は検証ログを確認する",
  "sourceDocument": "docs/implementation-plan.md"
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "agent-queue-missing-required",
  "title": "必須項目不足サンプル",
  "queueStatus": "ready",
  "resumeNote": "次は検証ログを確認する",
  "sourceDocument": "docs/implementation-plan.md"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
