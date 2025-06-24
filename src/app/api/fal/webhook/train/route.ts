import prisma from '@/db';

export async function POST(req: Request) {
  const body = await req.json();

  const requestId = body.request_id;
  const tensorPath = body?.response?.model_path;

  if (!requestId || !tensorPath) {
    return new Response('Invalid webhook payload', { status: 400 });
  }

  await prisma.trainModel.updateMany({
    where: { falAIRequestId: requestId },
    data: {
      tensorPath: tensorPath,
      status: 'GENERATED',
    },
  });

  return new Response('OK', { status: 200 });
}
