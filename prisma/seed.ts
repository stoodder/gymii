import prisma from '@/server/prisma';
import { AuthService } from "@/server/services";

(async function() {
	let exitCode = 0;
	
	try {
		const user = await prisma.user.findFirst({
			where: {email: 'test@test.com'}
		}) || await prisma.user.create({data: {
			email: 'test@test.com',
			name: 'Test',
			password: await AuthService.encryptPassword('test'),
		}});
	} catch(e) {
		console.error(e)
		exitCode = 1;
	} finally {
		await prisma.$disconnect();
	}

	process.exit(exitCode);
})()
