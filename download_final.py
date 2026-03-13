import os, requests
try:
    from duckduckgo_search import DDGS
except ImportError:
    import sys
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "duckduckgo-search"])
    from duckduckgo_search import DDGS

os.makedirs('src/assets/final_images', exist_ok=True)
queries = {
  'milk': 'glass bottle of white milk on white background',
  'ghee': 'ghee jar golden refined white background',
  'curd': 'bowl of thick white curd yogurt top view white background',
  'butter': 'block of yellow butter white background',
  'paneer': 'fresh white paneer cubes white background',
  'yogurt': 'plain thick greek yogurt in bowl white background',
  'cream': 'fresh heavy cream pouring in bowl white background',
  'flavored_milk': 'glass bottle yellow flavored milk white background',
  'mushroom_button': 'fresh button mushrooms white background',
  'mushroom_oyster': 'raw oyster mushrooms white background',
  'mushroom_milky': 'milky mushrooms white background',
  'mushroom_shiitake': 'raw shiitake mushrooms white background',
  'mushroom_portobello': 'raw portobello mushroom white background',
  'mushroom_enoki': 'fresh enoki mushrooms white background',
  'mushroom_porcini': 'fresh porcini mushrooms white background',
  'mushroom_kingoyster': 'king oyster mushroom white background',
  'mushroom_maitake': 'maitake mushroom white background',
  'mushroom_chanterelle': 'chanterelle mushroom white background',
  'mushroom_lionsmane': 'lions mane mushroom white background'
}

with DDGS() as ddgs:
    for key, query in queries.items():
        try:
            results = list(ddgs.images(query, max_results=3))
            found = False
            for result in results:
                url = result['image']
                try:
                    res = requests.get(url, timeout=5)
                    if res.status_code == 200:
                        with open(f'src/assets/final_images/{key}.jpg', 'wb') as f:
                            f.write(res.content)
                        print(f'Success: {key}')
                        found = True
                        break
                except:
                    continue
            if not found:
                print(f'Failed to download any for {key}')
        except Exception as e:
            print(f'Error {key}: {e}')
