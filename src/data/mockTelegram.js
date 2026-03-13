export const mockTelegram = {
	connection: {
		status: 'Connected',
		botName: '@projectmanagement_bot',
		lastSync: '2026-03-12 11:47',
	},
	quickActions: [
		{ id: 'newtask', command: '/newtask', label: 'Crear tarea' },
		{ id: 'complete', command: '/complete', label: 'Completar tarea' },
		{ id: 'edit', command: '/edit', label: 'Editar tarea' },
		{ id: 'insights', command: '/insights', label: 'Pedir insights' },
	],
	commandHistory: [
		{ id: 'tg-1', command: '/newtask Setup CI checks', time: '09:14', status: 'Synced' },
		{ id: 'tg-2', command: '/complete TASK-1009', time: '10:02', status: 'Synced' },
		{ id: 'tg-3', command: '/edit TASK-1012', time: '11:26', status: 'Synced' },
		{ id: 'tg-4', command: '/insights sprint velocity', time: '11:47', status: 'Processed' },
	],
	flowTimeline: [
		{
			id: 'f-1',
			step: 'User sends command in Telegram',
			detail: 'El developer usa /newtask, /complete, /edit o /insights en el chat del bot.',
		},
		{
			id: 'f-2',
			step: 'Bot validates payload',
			detail: 'El bot interpreta el comando y valida formato basico antes de enviar al sistema.',
		},
		{
			id: 'f-3',
			step: 'Microservice event emitted',
			detail: 'Se genera un evento para task-service o prioritization-service.',
		},
		{
			id: 'f-4',
			step: 'Web app reflects update',
			detail: 'Dashboard y listas de tareas se actualizan con el nuevo estado.',
		},
	],
}
