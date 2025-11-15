import { issueDbToApi } from '../mappers/issue';
import {
  createIssueRepo,
  getIssueByIdRepo,
  updateIssueRepo,
} from '../repositories/issue.repository';
import type { Request, Response } from 'express';

export async function getIssueByIdHandler(req: Request, res: Response) {
  const issue = await getIssueByIdRepo(req.params.id);

  if (!issue) {
    return res.sendStatus(404);
  }

  return res.json(issueDbToApi(issue));
}

export async function updateIssueHandler(req: Request, res: Response) {
  const updated = await updateIssueRepo(req.params.id, req.body);

  if (!updated) {
    return res.sendStatus(404);
  }

  return res.json(issueDbToApi(updated));
}

export async function createIssueHandler(req: Request, res: Response) {
  const created = await createIssueRepo(req.body);
  return res.status(201).json(issueDbToApi(created));
}
