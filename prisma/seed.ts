import prisma from '@/server/prisma';
import * as bcrypt from 'bcrypt';

(async function() {
	let exitCode = 0;
	
	try {
		const user = await prisma.user.findFirst({
			where: {email: 'test@test.com'}
		}) || await prisma.user.create({data: {
			username: 'test',
			email: 'test@test.com',
			name: 'Test',
			password: await bcrypt.hash('password', 10)
		}});
	} catch(e) {
		console.error(e)
		exitCode = 1;
	} finally {
		await prisma.$disconnect();
	}

	process.exit(exitCode);
})()
