import { PrismaClient } from '@prisma/client';
import { AuthService } from "@/server/services";

const prisma = new PrismaClient();

(async function() {
	let exitCode = 0;
	
	try {
		await AuthService.register({
			email: 'test@test.com',
			name: 'Test',
			password: 'test',
		});
	} catch(e) {
		console.error(e)
		exitCode = 1;
	} finally {
		await prisma.$disconnect();
	}

	process.exit(exitCode);
})()
