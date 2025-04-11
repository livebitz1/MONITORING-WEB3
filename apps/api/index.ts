import express from 'express';
import { authMiddleware } from './middleware';
import { prismaClient } from '../../packages/db/index';
import cors from 'cors';
const app = express();
app.use(cors())
app.use(express.json());

app.post('/api/v1/website', authMiddleware, async (req, res) => {
    const userId = req.userId!;
    const {url} = req.body;

    const data = await prismaClient.website.create({
        data: {
            userId,
            url
        }
    })

    res.json({
        id: data.id,
    })
})

app.get('/api/v1/website/status', authMiddleware, async (req, res) => {
  const websiteId = req.query.websiteId as string;
  const userId = req.userId!;
  
  const data = await prismaClient.website.findFirst({
    where: {
      id: websiteId,
      userId,
      disabled: false
    }, 
    include: {
        ticks: true
    }
  });

  res.json(data);
})

app.get('/api/v1/websites', authMiddleware, async (req, res) => {
  const userId = req.userId!;

  try {
    const websites = await prismaClient.website.findMany({
      where: {
        userId,
        disabled: false
      },
      include: {
        websiteTicks: true  // Changed from 'ticks' to 'websiteTicks' to match seed.ts
      }
    });
    
    // Map to the format frontend expects
    const mappedWebsites = websites.map(website => ({
      ...website,
      ticks: website.websiteTicks.map(tick => ({
        createdAt: tick.createdAt,
        status: tick.status
      }))
    }));
    
    res.json({
      websites: mappedWebsites,
    });
  } catch (error) {
    console.error("Error fetching websites:", error);
    res.status(500).json({
      message: "Failed to fetch websites",
      error: error instanceof Error ? error.message : String(error)
    });
  }
});

app.delete('/api/v1/website/', authMiddleware, async (req, res) => {
 const websiteId = req.query.websiteId as string;
 const userId = req.userId!;

 await prismaClient.website.update({
    where: {
        id: websiteId,
        userId
    },
    data: {
        disabled: true
    }
 })
    res.json({
        message: 'Deleted website successfully'
    })
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
