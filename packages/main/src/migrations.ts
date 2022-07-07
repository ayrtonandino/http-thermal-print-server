const modules = import.meta.globEager('./migrations/*.ts')

const migrations = {}

for (const path in modules) {
    const module = modules[path].default as App.Migration

    Object.assign(migrations, module)
}

export default migrations
