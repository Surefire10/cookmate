/** @type {import('next').NextConfig} */
const nextConfig = {

    env:{

        POSTGRES_URL:"postgres://default:LzCu4Nm8xQRX@ep-shrill-mode-91267911-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb",
        POSTGRES_PRISMA_URL:"postgres://default:LzCu4Nm8xQRX@ep-shrill-mode-91267911-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?pgbouncer:true&connect_timeout:15",
        POSTGRES_URL_NON_POOLING:"postgres://default:LzCu4Nm8xQRX@ep-shrill-mode-91267911.us-east-1.postgres.vercel-storage.com:5432/verceldb",
        POSTGRES_USER:"default",
        POSTGRES_HOST:"ep-shrill-mode-91267911-pooler.us-east-1.postgres.vercel-storage.com",
        POSTGRES_PASSWORD:"LzCu4Nm8xQRX",
        POSTGRES_DATABASE:"verceldb"
    },
}

module.exports = nextConfig
