import { ParameterNode } from './types';

export async function getParameter() {
  const response = await fetch(process.env.REACT_APP_BASE_URL! + '/get/');
  const body = (await response.json()) as unknown;

  assertIsParameter(body);

  return body;
}

// TODO: Assert response object
export function assertIsParameter(response: unknown): asserts response is ParameterNode {}
