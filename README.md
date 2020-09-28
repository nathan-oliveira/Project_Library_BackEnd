yarn tsc --init

yarn typeorm migration:create -n CreateTasks

yarn typeorm migration:run