<template>
	<PageCentered>
		<PageTitle>
			Settings
		</PageTitle>
		<PageTabs>
			<PageTab to="/settings">
				Profile
			</PageTab>
			<PageTab to="/settings/change-password">
				Change Password
			</PageTab>
		</PageTabs>
		<RouterView />
	</PageCentered>
</template>
