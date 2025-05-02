import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const company = await prisma.company.create({
    data: {
      name: 'Example Company',
      wa_instances: {
        create: {
          instance_name: 'Main WhatsApp Instance',
          instance_id: 'example-instance-1',
          status: 'active',
        },
      },
    },
  });

  console.log('Created example company:', company);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });