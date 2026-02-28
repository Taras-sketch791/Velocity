import requests
from bs4 import BeautifulSoup
import json
import urllib3
import time

# Отключаем предупреждения SSL
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


def parse_electronics():
    # 1. ДОБАВЬТЕ СЮДА ВСЕ ССЫЛКИ, КОТОРЫЕ ХОТИТЕ СПАРСИТЬ
    urls = [
        "https://5element.by/catalog/377-smartfony/brand=samsung",
        "https://5element.by/catalog/377-smartfony/iphone-17",
        "https://5element.by/products/iphone-16",
        "https://5element.by/catalog/1403-televizory/brand=samsung"
    ]

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    }

    all_products = []
    global_id = 3000  # Начальный ID для новых товаров

    for url in urls:
        print(f"🔎 Сканирую страницу: {url}")
        try:
            # Загружаем страницу
            response = requests.get(url, headers=headers, verify=False, timeout=10)
            soup = BeautifulSoup(response.text, 'html.parser')

            # Ищем карточки (ваш класс)
            items = soup.find_all(class_='c-list__item')
            print(f"   Найдено объектов на странице: {len(items)}")

            for item in items:
                try:
                    # Название
                    title_el = item.find(class_='c-list__title')
                    if not title_el: continue
                    title = title_el.text.strip()

                    # Цена
                    price_el = item.find(class_='c-price__current') or item.find(class_='price')
                    price_text = price_el.text.strip() if price_el else "0"
                    price = int(''.join(filter(str.isdigit, price_text)))

                    # Картинка
                    img_el = item.find('img')
                    img_url = img_el.get('data-src') or img_el.get('src') if img_el else ""

                    # Собираем данные
                    all_products.append({
                        "id": global_id,
                        "brand": "Техника",  # Можно улучшить определение бренда
                        "title": title,
                        "discount_price": price,
                        "image": img_url,
                        "description": f"Купить {title}. Официальная гарантия.",
                        "category": 1,
                        "in_stock": True
                    })
                    global_id += 1  # Увеличиваем ID для следующего товара
                except:
                    continue

            # Небольшая пауза, чтобы сайт нас не забанил
            time.sleep(1)

        except Exception as e:
            print(f"❌ Ошибка на ссылке {url}: {e}")

    # Сохраняем все собранные товары в один файл
    with open('scraped_products.json', 'w', encoding='utf-8') as f:
        json.dump(all_products, f, ensure_ascii=False, indent=2)

    print(f"\n✅ ГОТОВО! Всего спарсено: {len(all_products)} товаров.")
    print("Данные в файле scraped_products.json")


if __name__ == "__main__":
    parse_electronics()