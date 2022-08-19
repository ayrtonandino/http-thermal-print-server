const modules = import.meta.glob('./migrations/*.ts', { eager: true })

const migrations = {}

for (const path in modules) {
    const module = modules[path].default as App.Migration

    Object.assign(migrations, module)
}

export default migrations
